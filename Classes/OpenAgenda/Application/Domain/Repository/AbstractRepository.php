<?php
namespace OpenAgenda\Application\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "OpenAgenda.Application".*
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Persistence\Repository;

/**
 * Class AbstractRepository
 * @Flow\Scope("singleton")
 * @package OpenAgenda\Application\Domain\Repository
 * @author Oliver Hader <oliver@typo3.org>
 */
class AbstractRepository extends Repository {

	/**
	 * @Flow\Inject
	 * @var \TYPO3\Flow\Security\Context
	 */
	protected $securityContext;

	/**
	 * Gets person entity of currently logged in account.
	 *
	 * @return \OpenAgenda\Application\Domain\Model\Person
	 */
	protected function getPerson() {
		return $this->securityContext->getParty();
	}

	/**
	 * @param object $subject
	 * @return NULL|string
	 */
	protected function identify($subject) {
		return $this->persistenceManager->getIdentifierByObject($subject);
	}

}