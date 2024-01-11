(function( $ ) {
	'use strict';

	$(function () {
		var page = $("#portfolio-iimm");
		var modals = $("#portfolio-iimm-modals");

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
				var localWorks = Object.entries(response).map(function([id, data]) {
					data.id = id;
					return data;
				});

				await localStorage.setItem("portfolio", JSON.stringify(localWorks));
				loadDataLocal();

			}
		).fail(function(response) {
			console.error(response);
		});

		function loadDataLocal(){
			if(localStorage.getItem("portfolio") !== null){
				var data = localStorage.getItem("portfolio");
				var localWorks = JSON.parse(data);
				renderHTML(localWorks);
				renderModal(localWorks);
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
						<h3>${work.title}</h3>
						<div class="modal-content">
							<div class="description">${work.description}</div>
							${buttonLink(work.link)}
							<div class="images">
								${images(work.images)}
							</div>
						</div>
						<div class="modal-footer">
							<a href="#" rel="modal:close" class="btn btn-primary">Cerrar</a>
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
								<div class="description">${work.description}</div>
							</div>
							<div class="footer">
								<a href="#modal-${work.id}" class="btn btn-primary" rel="modal:open" data-toggle="modal-${work.id}">Ver más</a>
								${buttonLink(work.link)}
							</div>
						</div>
					<div
				</div>
			`;
		}


		function images(images){
			var imagesHtml = "";
			for (var i = 0; i < images.length; i++) {
				var image = images[i];
				imagesHtml += `
					<div class="image-caption">
						<h4>${image.title}</h4>
						<p>${image.caption}</p>
						<picture>
							<img class="image" src="${image.image}" alt="${image.title}">
						</picture>
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

		function buttonLink(link){
			if(!link || link === " ") return "";
			return `<a class="btn" href="${link}" target="_blank">Ver en vivo</a>`;
		}

	});

})( jQuery );
