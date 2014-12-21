<?php
namespace OpenAgenda\Application\Controller;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "OpenAgenda.Application".*
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use OpenAgenda\Application\Domain\Model\Invitation;

class InvitationController extends AbstractController {

	/**
	 * @Flow\Inject
	 * @var \OpenAgenda\Application\Domain\Repository\InvitationRepository
	 */
	protected $invitationRepository;

	/**
	 * @return void
	 */
	public function listAction() {
		$this->view->assign('value', $this->arrayService->flatten($this->invitationRepository->findByPerson()));
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\Invitation $invitation
	 * @return void
	 */
	public function showAction(Invitation $invitation) {
		$this->view->assign('invitation', $invitation);
	}

	/**
	 * @return void
	 */
	public function newAction() {
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\Invitation $newInvitation
	 * @return void
	 */
	public function createAction(Invitation $newInvitation) {
		$this->invitationRepository->add($newInvitation);
		$this->addFlashMessage('Created a new invitation.');
		$this->redirect('index');
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\Invitation $invitation
	 * @return void
	 */
	public function editAction(Invitation $invitation) {
		$this->view->assign('invitation', $invitation);
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\Invitation $invitation
	 * @return void
	 */
	public function updateAction(Invitation $invitation) {
		$this->invitationRepository->update($invitation);
		$this->addFlashMessage('Updated the invitation.');
		$this->redirect('index');
	}

	/**
	 * @param \OpenAgenda\Application\Domain\Model\Invitation $invitation
	 * @return void
	 */
	public function deleteAction(Invitation $invitation) {
		$this->invitationRepository->remove($invitation);
		$this->addFlashMessage('Deleted a invitation.');
		$this->redirect('index');
	}

}