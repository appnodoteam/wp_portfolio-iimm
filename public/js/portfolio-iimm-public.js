(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	$(function() {
		var page = $("#portfolio-iimm");
		var modals = $("#portfolio-iimm-modals");

		loadDataLocal();

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
						<div class="loader"></div>
					</div>
				`);
			},
		}).success(
			function(response) {
				console.log("Success")
				var localWorks = Object.entries(response).map(function([id, data]) {
					data.id = id;
					return data;
				});

				localStorage.setItem("portfolio", JSON.stringify(localWorks));
				loadDataLocal();

			}
		).error(function(response) {
				console.log("Error")
				console.error(response);
		});

		function loadDataLocal(){
			if(localStorage.getItem("portfolio")) {
				var data = localStorage.getItem("portfolio");
				var localWorks = JSON.parse(data);
				renderHTML(localWorks);
				renderModal(localWorks);
			}
		}

		function renderHTML(works){
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
						<h3>Mod: ${work.title}</h3>
						<div class="modal-content">
							<div class="description">${work.description}</div>
							<div class="images">
								${images(work.images)}
							</div>
						</div>
						<div class="modal-footer">
							${buttonLink(work.link)}
							<a href="#" rel="modal:close" class="btn btn-primary">Cerrar</a>
						</div>
					</div>
				</div>
				`;
		}

		function templateCard(work) {
			return `
				<div class="card">
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
				</div>
			`;
		}


		function images(images){
			var imagesHtml = "";
			for (var i = 0; i < images.length; i++) {
				var image = images[i];
				imagesHtml += `
					<div>
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
				thumbnailsHtml += `<img class="thumbnail" src="${thumbnail}" alt="${thumbnail}">`;
			}
			return thumbnailsHtml;
		}

		function buttonLink(link){
			if(!link) return "";
			return `<a class="btn" href="${link}" target="_blank">Ver en vivo</a>`;
		}

	});

})( jQuery );
