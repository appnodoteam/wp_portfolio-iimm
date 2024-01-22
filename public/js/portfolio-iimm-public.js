(function( $ ) {
	'use strict';

	$(function () {
		var page = $("#portfolio-iimm");
		var modals = $("#portfolio-iimm-modals");
		var portfolioTags = $("#portfolio-iimm-tags");

		var allTags = [];

		$.ajax({
			url: "https://clientes4-iimm.firebaseio.com/tags.json",
			method: "GET",
			timeout: 0,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		}).done(function(response) {
			allTags = Object.entries(response).map(function ([id, data]) {
				data.id = id;
				return data;
			});
			renderTags(allTags);
		});

		$.ajax({
			url: "https://clientes4-iimm.firebaseio.com/portfolio.json",
			method: "GET",
			timeout: 0,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			beforeSend: function() {

				page.html(`
						<div class="portfolio-loader">
							<div class="loader-portfolio"></div>
						</div>
					`);
			},
		}).done(
			async function(response) {
				const localWorks = Object.entries(response).map(function ([id, data]) {
					data.id = id;
					return data;
				});

				// sort by data.order
				localWorks.sort(function(a, b) {
					return a.order - b.order;
				});

				await localStorage.setItem("portfolio", JSON.stringify(localWorks));
				loadDataLocal();

			}
		).fail(function(response) {
			console.error(response);
		});
		function renderTags(tags){
			if(!tags) return;
			portfolioTags.html(allTags.map(function(tag){
				return `<span class="main-tags" title="${tag.name}" data-name="${tag.name}">${tag.name}</span>`;
			}));
		}

		portfolioTags.on("click", ".main-tags", function(){
			loadDataLocal($(this).data("name"));
		});

		function loadDataLocal(filter){
			if (localStorage.getItem("portfolio") !== null) {
				let data = localStorage.getItem("portfolio");
				let localWorks = JSON.parse(data);
				let lwf = localWorks;
				if(filter){
					lwf = localWorks.filter(function(work){
						return work.tags.includes(filter);
					});
				}
				if(lwf.length === 0){
					lwf = localWorks;
				}
				renderHTML(lwf);
				renderModal(lwf);
			}
		}

		function renderHTML(works){
			if(!works) return;
			page.html("");
			for (var i = 0; i < works.length; i++) {
				var work = works[i];
				var card = $(templateCard(work));
				page.append(card);
			}
		}
		function renderModal(works){
			for (var i = 0; i < works.length; i++) {
				var work = works[i];
				var modal = $(templateModal(work));
				modals.append(modal);
			}
		}

		function templateModal(work) {
			return `
				<div id="modal-${work.id}" class="modal">
					<div class="modal-body">
						<h2>${work.title}</h2>
						<div class="modal-content">
							<div class="description">${work.description}</div>
							<div class="buttons">
								${buttonLink(work.link)}
							</div>
							<div class="images">
								${images(work.images)}
							</div>
							<div class="buttons">
							${buttonLink(work.link)}
							<a href="#" rel="modal:close" class="btn btn-primary">Cerrar</a>
							</div>
						</div>
					</div>
				</div>
				`;
		}

		function templateCard(work) {
			return `
				<div class="card">
					<a href="#modal-${work.id}" rel="modal:open" data-toggle="modal-${work.id}">
						<div class="card-body">
							<div class="thumbnails">
								${thumbnails(work.thumbnails)}
							</div>
							<div class="content">
								<h3 class="title">${work.title}</h3>
								<div class="description">${work.shortDescription}</div>
							</div>
							<div class="footer">
								<a href="#modal-${work.id}" class="btn btn-primary" rel="modal:open" data-toggle="modal-${work.id}">Ver más</a>
								${buttonLink(work.link)}
							</div>
						</div>
					</a>
				</div>
			`;
		}


		function images(images){
			if(!images) return "";
			var imagesHtml = "";
			for (var i = 0; i < images.length; i++) {
				var image = images[i];
				imagesHtml += `
					<div class="image-caption">
						<h5>${image.title}</h5>
						<img class="image" src="${image.image}" alt="${image.caption}">
					</div>`;
			}
			return imagesHtml;
		}

		function thumbnails(thumbnails){
			var thumbnailsHtml = "";
			for (var i = 0; i < thumbnails.length; i++) {
				var thumbnail = thumbnails[i];
				thumbnailsHtml += `
				<div class="cont-thumbnail" style="background: #f8e790">
					<div class="gradient"></div>
					<img class="thumbnail" width="75" height="75" src="${thumbnail.image}" alt="${thumbnail.caption}" title="${thumbnail.caption}">
				</div>`;
			}
			return thumbnailsHtml;
		}

		function buttonLink(link) {
			if (!link || link === " ") return "";
			return `<a class="btn" href="${link}" target="_blank">Ver en vivo</a>`;
		}

	});

})( jQuery );
