package com.thomasmoore.otter.mvc.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thomasmoore.otter.mvc.models.Notification;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long>{
	List<Notification> findAllByRecipientId(Long recipientId);
	
	List<Notification> findAllBySenderId(Long senderId);
}
