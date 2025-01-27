<?php

namespace Drupal\wf_custom_conf\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\wf_custom_conf\Controller\WfCustomConfController;

/**
 * Provides a custom form.
 */
class WorkFlowStatesForm extends FormBase {
	/**
		* {@inheritdoc}
	*/
	public function getFormId() {
		return 'workflowstates';
	}

	/**
		* {@inheritdoc}
	*/
	public function buildForm(array $form, FormStateInterface $form_state) {
		if($_POST){
			print_r($_POST); exit;
		}
		$wf_class = new WfCustomConfController();
		$cdata = $wf_class->fetch_wf_list();
		$cdata = json_decode($cdata->getContent(), true);
		array_unshift($cdata, "Select the Workflow");
		$form['get_wf_name'] = ['#type' => 'select', '#title' => t('Select the Content Type'), '#options' =>$cdata];
		$form['get_wf_states'] = ['#type' => 'select', '#title' => t('Select the States'), '#options' =>[]];
		$form['man_fields'] = ['#type' => 'select', '#title' => t('Select the Mandatory Fields for the WF State'), '#options' =>[], '#multiple' => TRUE,];
		$form['custom_php_logic'] = [ '#type' => 'textarea', '#title' => $this->t('Custom PHP Code'), ];
		$form['submit'] = [ '#type' => 'submit', '#value' => $this->t('Configure'), ];
		$form['#attached']['library'][] = 'wf_custom_conf/wf_custom_conf_js';
		return $form;
	}
	
	/**
		* {@inheritdoc}
	*/
	public function submitForm(array &$form, FormStateInterface $form_state) {
		echo "<pre>";
		print_r($form_state);exit;
		
		\Drupal::messenger()->addMessage($this->t('Form submitted successfully.'));
	}
	

}
