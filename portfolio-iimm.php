<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://datogedon.com
 * @since             1.0.0
 * @package           Portfolio_Iimm
 *
 * @wordpress-plugin
 * Plugin Name:       Portfolio IIMM
 * Plugin URI:        https://plugins.iimm.biz/portfolio-iimm
 * Description:       Plugin wordpress para mostrar el portfolio de Industrias Multimedia
 * Version:           1.0.7
 * Author:            Baldomero Cho
 * Author URI:        https://datogedon.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       portfolio-iimm
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PORTFOLIO_IIMM_VERSION', '1.0.2' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-portfolio-iimm-activator.php
 */
function activate_portfolio_iimm() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-portfolio-iimm-activator.php';
	Portfolio_Iimm_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-portfolio-iimm-deactivator.php
 */
function deactivate_portfolio_iimm() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-portfolio-iimm-deactivator.php';
	Portfolio_Iimm_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_portfolio_iimm' );
register_deactivation_hook( __FILE__, 'deactivate_portfolio_iimm' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-portfolio-iimm.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_portfolio_iimm() {

	$plugin = new Portfolio_Iimm();
	$plugin->run();

}
run_portfolio_iimm();
