<?php

namespace Drupal\wf_custom_conf\Controller;


use Drupal\Core\Entity\EntityFieldManagerInterface;

class WfContentFieldsController { 
  protected $entityFieldManager;

  public function __construct(EntityFieldManagerInterface $entityFieldManager) {
    $this->entityFieldManager = $entityFieldManager;
  }

  public function getFields($contentType) {
    $fields = $this->entityFieldManager->getFieldDefinitions('node', $contentType);
    $fieldList = [];
    foreach ($fields as $field_name => $field_definition) {
      $fieldList[] = $field_name;
    }
    return $fieldList;
  }
}
