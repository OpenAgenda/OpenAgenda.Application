<?php
namespace OpenAgenda\Application\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "OpenAgenda.Application".*
 *                                                                        *
 *                                                                        */

use OpenAgenda\Application\Annotations as OA;
use TYPO3\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 */
class Meeting {

    /**
     * @var \Doctrine\Common\Collections\Collection<\OpenAgenda\Application\Domain\Model\AgendaItem>
     * @ORM\OneToMany(mappedBy="meeting")
	 * @OA\ToArray
     */
    protected $agendaItems;

    /**
     * @var \Doctrine\Common\Collections\Collection<\OpenAgenda\Application\Domain\Model\ProtocolItem>
     * @ORM\OneToMany(mappedBy="meeting")
	 * @OA\ToArray
     */
    protected $protocolItems;

	/**
	 * @var string
	 * @OA\ToArray
	 */
	protected $title;

	/**
	 * @var \DateTime
	 * @OA\ToArray(callback="$self->format('c')")
	 */
	protected $startDate;

    /**
	 * @var \DateTime
	 * @OA\ToArray(callback="$self->format('c')")
	 */
	protected $endDate;

    /**
	 * @var integer
	 * @OA\ToArray
	 */
	protected $status;

    /**
	 * @var \DateTime
	 * @OA\ToArray(callback="$self->format('c')")
	 */
	protected $creationDate;

    /**
	 * @var \DateTime
	 * @OA\ToArray(callback="$self->format('c')")
	 */
	protected $modificationDate;

	/**
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getAgendaItems()
	{
		return $this->agendaItems;
	}

	/**
	 * @return \DateTime
	 */
	public function getCreationDate()
	{
		return $this->creationDate;
	}

	/**
	 * @return \DateTime
	 */
	public function getEndDate()
	{
		return $this->endDate;
	}

	/**
	 * @return \DateTime
	 */
	public function getModificationDate()
	{
		return $this->modificationDate;
	}

	/**
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getProtocolItems()
	{
		return $this->protocolItems;
	}

	/**
	 * @return \DateTime
	 */
	public function getStartDate()
	{
		return $this->startDate;
	}

	/**
	 * @return int
	 */
	public function getStatus()
	{
		return $this->status;
	}

	/**
	 * @return string
	 */
	public function getTitle()
	{
		return $this->title;
	}

	/**
	 * @param \Doctrine\Common\Collections\Collection $agendaItems
	 */
	public function setAgendaItems($agendaItems)
	{
		$this->agendaItems = $agendaItems;
	}

	/**
	 * @param \DateTime $creationDate
	 */
	public function setCreationDate($creationDate)
	{
		$this->creationDate = $creationDate;
	}

	/**
	 * @param \DateTime $endDate
	 */
	public function setEndDate($endDate)
	{
		$this->endDate = $endDate;
	}

	/**
	 * @param \DateTime $modificationDate
	 */
	public function setModificationDate($modificationDate)
	{
		$this->modificationDate = $modificationDate;
	}

	/**
	 * @param \Doctrine\Common\Collections\Collection $protocolItems
	 */
	public function setProtocolItems($protocolItems)
	{
		$this->protocolItems = $protocolItems;
	}

	/**
	 * @param \DateTime $startDate
	 */
	public function setStartDate($startDate)
	{
		$this->startDate = $startDate;
	}

	/**
	 * @param int $status
	 */
	public function setStatus($status)
	{
		$this->status = $status;
	}

	/**
	 * @param string $title
	 */
	public function setTitle($title)
	{
		$this->title = $title;
	}

}