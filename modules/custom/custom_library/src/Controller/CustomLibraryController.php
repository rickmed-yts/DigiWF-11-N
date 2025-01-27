<?php

namespace Drupal\custom_library\Controller;

use Drupal\Core\Controller\ControllerBase;

use Drupal\workflows\Entity\Workflow;


/**
 * Controller for My Module.
 */
class CustomLibraryController extends ControllerBase {

  /**
   * Returns a simple page.
   *
   * @return array
   *   A render array.
   */
  public function content() {
	  $workflows = Workflow::loadMultiple();
	  echo "<pre>";
	  foreach ($workflows as $workflow) {
		  print_r($workflow->get('type_settings'));exit;
		  echo $workflow_name = $workflow->label();
		  echo "<br/>";
		  $states = $workflow->get('type_settings')['states'];
		  $state_names = array_map(function ($state) {return $state['label'];}, $states);
		  print_r($state_names);echo "<br/>";
		  $transitions = $workflow->get('type_settings')['transitions'];
		  $transition_names = array_map(function ($transition) {return $transition['label'];}, $transitions);
		  print_r($transition_names);exit;
	  }
	  
	  
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Hello, this is my custom module page!'),
    ];
  }
}