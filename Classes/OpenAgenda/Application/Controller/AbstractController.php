<?php
namespace OpenAgenda\Application\Controller;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "OpenAgenda.Application".*
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;

/**
 * Class AbstractController
 *
 * @package OpenAgenda\Application\Controller
 * @author Oliver Hader <oliver@typo3.org>
 */
class AbstractController extends ActionController {

	/**
	 * @var string
	 */
	protected $viewFormatToObjectNameMap = array(
		'html' => 'TYPO3\Fluid\View\TemplateView',
		'json' => 'TYPO3\Flow\Mvc\View\JsonView',
	);

	/**
	 * @Flow\Inject
	 * @var \TYPO3\Flow\Security\Context
	 */
	protected $securityContext;

	/**
	* @Flow\Inject
	* @var \OpenAgenda\Application\Service\Security\PermissionService
	*/
	protected $permissionService;

	/**
	 * @Flow\Inject
	 * @var \OpenAgenda\Application\Service\Security\PropertyMappingService
	 */
	protected $propertyMappingService;

	/**
	 * @Flow\Inject
	 * @var \OpenAgenda\Application\Service\Communication\MessagingService
	 */
	protected $messagingService;

	/**
	 * @Flow\Inject
	 * @var \OpenAgenda\Application\Service\ArrayService
	 */
	protected $arrayService;

	/**
	 * @Flow\Inject
	 * @var \OpenAgenda\Application\Service\EntityService
	 */
	protected $entityService;

	/**
	 * @Flow\Inject
	 * @var \OpenAgenda\Application\Service\HistoryService
	 */
	protected $historyService;

	/**
	 * @return void
	 */
	protected function initializeAction() {
		$this->propertyMappingService->configure($this->arguments, $this->request->getControllerActionName());
	}

	/**
	 * @return void
	 * @throws \Exception
	 * @author Oliver Hader <oliver@typo3.org>
	 */
	protected function callActionMethod() {
		try {
			parent::callActionMethod();
		} catch (\Exception $exception) {
			// If not in a JSON format context, directly throw exception again
			if (!$this->view instanceof \TYPO3\Flow\Mvc\View\JsonView) {
				throw $exception;
			}

			$message = $exception->getMessage() . ' in ' . $exception->getFile() . ':' . $exception->getLine();
			$this->systemLogger->log($message, LOG_EMERG);
			$this->view->assign('value', array('exception' => $message));
			$this->response->appendContent($this->view->render());
			$this->response->setStatus(503);
		}
	}

	/**
	 * Provides a default error action in case failures
	 * are encountered during the processing.
	 *
	 * @return string
	 */
	protected function errorAction() {
		$content = parent::errorAction();

		if (!$this->view instanceof \TYPO3\Flow\Mvc\View\JsonView) {
			return $content;
		}

		$validationMessages = array();
		foreach ($this->arguments->getValidationResults()->getFlattenedErrors() as $propertyPath => $errors) {
			/** @var \TYPO3\Flow\Validation\Error $error */
			foreach ($errors as $error) {
				$validationMessages[$propertyPath]['errors'][] = $error->render();
			}
		}

		$this->view->assign('value', array('validation' => $validationMessages));
	}

	/**
	 * @return \TYPO3\Flow\Security\Account
	 */
	protected function getAccount() {
		return $this->securityContext->getAccount();
	}

}