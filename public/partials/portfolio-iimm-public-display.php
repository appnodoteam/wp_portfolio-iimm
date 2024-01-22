<?php

class Portfolio_Iimm_Public_Display{

	public function __construct(){
		//
	}

	// create shortcode
	public function register()
	{
		add_shortcode('portfolio-iimm', array($this, 'portfolio_iimm_get'));
	}

    public function portfolio_iimm_get(){
        return self::porfolio_view();
    }

    public function porfolio_view(){
	    $html = '
        <div id="portfolio-iimm-tags"></div>
        <div id="portfolio-iimm" class="portfolio"></div>
        <div id="portfolio-iimm-modals"></div>
        ';
        return $html;
    }

}

?>
