<?php
namespace OpenAgenda\Application\Controller;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "OpenAgenda.Application".*
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;
use OpenAgenda\Application\Domain\Model\History;

/**
 * Class HistoryController
 *
 * @package OpenAgenda\Application\Controller
 * @author Andreas Steiger <andreas.steiger@hof-university.de>
 */
class HistoryController extends ActionController {

	/**
	 * @Flow\Inject
	 * @var \OpenAgenda\Application\Domain\Repository\HistoryRepository
	 */
	protected $historyRepository;

	/**
	 * @return void
	 * @deprecated This action is not used
	 */
	public function indexAction() {
		$this->view->assign('histories', $this->historyRepository->findAll());
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\History $history
	 * @return void
	 * @deprecated This action is not used
	 */
	public function showAction(History $history) {
		$this->view->assign('history', $history);
	}

	/**
	 * @return void
	 * @deprecated This action is not used
	 */
	public function newAction() {
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\History $newHistory
	 * @return void
	 */
	public function createAction(History $newHistory) {
		$newHistory->setCreationDate(new \DateTime());
		$this->historyRepository->add($newHistory);
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\History $history
	 * @return void
	 * @deprecated This action is not used
	 */
	public function editAction(History $history) {
		$this->view->assign('history', $history);
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\History $history
	 * @return void
	 */
	public function deleteAction(History $history) {
		$this->historyRepository->remove($history);
		$this->addFlashMessage('Deleted a history.');
		$this->redirect('index');
	}

}