<?php
namespace OpenAgenda\Application\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "OpenAgenda.Application".*
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;

/**
 * Class ElectronicAddressRepository
 *
 * @Flow\Scope("singleton")
 * @package OpenAgenda\Application\Domain\Repository
 * @author Oliver Hader <oliver@typo3.org>
 */
class ElectronicAddressRepository extends \TYPO3\Party\Domain\Repository\PartyRepository {

	const ENTITY_CLASSNAME = 'TYPO3\\Party\\Domain\\Model\\ElectronicAddress';

	/**
	 * Finds ElectronicAddress entities by plain mail addresses.
	 *
	 * @param array|string[] $mailAddresses Plain mail addresses
	 * @return \TYPO3\Flow\Persistence\QueryResultInterface|\TYPO3\Party\Domain\Model\ElectronicAddress[]
	 */
	public function findByMailAddresses(array $mailAddresses) {
		$constraints = array();
		$query = $this->createQuery();

		foreach ($mailAddresses as $mailAddress) {
			$constraints[] = $query->equals('identifier', $mailAddress);
		}

		$query->matching($query->logicalOr($constraints));
		return $query->execute();
	}

}