<?php

namespace Drupal\wf_custom_conf\Controller;

use Symfony\Component\HttpFoundation\JsonResponse; 
use Drupal\Core\Controller\ControllerBase;

use Drupal\workflows\Entity\Workflow;
use Drupal\wf_custom_conf\Helper\CfieldsHelper;



/**
 * Controller for My Module.
 */
class WfCustomConfController extends ControllerBase {
	
	// fetch the list of Workflows in the Application
	public function fetch_wf_list() {
		$workflows = Workflow::loadMultiple();
		$c_list = [];
		foreach ($workflows as $workflow) {
			$ct_data = $workflow->getDependencies()['config'][0];
			$ct_array = explode(".",$ct_data);
			$content_type = end($ct_array);
			$c_list[$content_type] = $content_type;
		}
		return new JsonResponse($c_list);
	}
	
	// fetch the list of Workflows states by content Type
	public function fetch_wf_states_list() {
		$workflows = Workflow::loadMultiple();
		$w_states_list = [];
		foreach ($workflows as $workflow) {
			$ct_data = $workflow->getDependencies()['config'][0];
			$ct_array = explode(".",$ct_data);
			$content_type = end($ct_array);
			$states = $workflow->get('type_settings')['states'];
			$labels_list = array_map(function ($state) {return $state['label'];}, $states);
			$state_list['CT'][$content_type] = $labels_list;
			$state_list['WID'][$workflow->id()] = $labels_list;
		}
		return new JsonResponse($state_list);
	}
	
	public function ct_fields_by_content_type(){
		if($_POST['ct']){
			$fields = CfieldsHelper::getCustomFields($_POST['ct']);
		}else{
			$fields = array("Request Status"=>"Invalid Request");
		}
		return new JsonResponse($fields);
	}
	
	
}