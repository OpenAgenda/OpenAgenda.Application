<?php
namespace OpenAgenda\Application\Tests\Unit\Service\Fixture;

/*                                                                           *
 * This script belongs to the TYPO3 Flow package "OpenAgenda.Application". *
 *                                                                           */

use TYPO3\Flow\Annotations as Flow;

/**
 * @group small
 */
class SimpleEntity {

	/**
	 * @var string
	 */
	protected $title;

	/**
	 * @var \DateTime
	 */
	protected $date;

	/**
	 * @var \DateTime
	 */
	protected $modificationDate;

	/**
	 * @param string $title
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * @return \DateTime
	 */
	public function getModificationDate() {
		return $this->modificationDate;
	}

	/**
	 * @param \DateTime $modificationDate
	 */
	public function setModificationDate(\DateTime $modificationDate) {
		$this->modificationDate = $modificationDate;
	}

	/**
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}
	/**
	 * @param \DateTime $date
	 */
	public function setDate(\DateTime $date) {
		$this->date = $date;
	}

	/**
	 * @return \DateTime
	 */
	public function getDate() {
		return $this->date;
	}


}
