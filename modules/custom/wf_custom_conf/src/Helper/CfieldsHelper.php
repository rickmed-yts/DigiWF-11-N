<?php

namespace Drupal\wf_custom_conf\Helper;

use Drupal\Core\Entity\EntityFieldManager;

class CfieldsHelper {
  public static function getCustomFields($contentType) {
    // Get the entity field manager service
    $entity_field_manager = \Drupal::service('entity_field.manager');

    // Get all field definitions for the specified content type
    $fields = $entity_field_manager->getFieldDefinitions('node', $contentType);
    $fieldList = [];
    // Loop through the fields and filter out the default fields
    foreach ($fields as $field_name => $field_definition) {
      if (!$field_definition->getFieldStorageDefinition()->isBaseField()) {
		if($field_name!='body'){
			$fieldList[$field_name] = $field_definition->label();
		}
      }
    }
    return $fieldList;
  }
}
