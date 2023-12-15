<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://datogedon.com
 * @since      1.0.0
 *
 * @package    Portfolio_Iimm
 * @subpackage Portfolio_Iimm/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Portfolio_Iimm
 * @subpackage Portfolio_Iimm/includes
 * @author     Baldomero Cho <b@iimm.biz>
 */
class Portfolio_Iimm_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'portfolio-iimm',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
