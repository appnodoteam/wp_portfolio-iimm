<?php
class Portfolio_Iimm_Public_Service {

	public function getList()
	{
		$works = '[
			{
			"link":"https://",
			"title":"title",
			"description":"description",
			"thumbnails":[
				{
					"src":"https://",
					"alt":"alt"
				},
				{
					"src":"https://",
					"alt":"alt"
				}
			],
			"images":[
				{
					"src":"https://",
					"alt":"alt"
				},
				{
					"src":"https://",
					"alt":"alt"
				}
			],
			"videos":[
				{
					"src":"https://",
					"alt":"alt"
				},
				{
					"src":"https://",
					"alt":"alt"
				}
			}
		]';
		$decode = json_decode($works);
		$encode = json_encode($decode);
		return $encode;
	}
}


?>