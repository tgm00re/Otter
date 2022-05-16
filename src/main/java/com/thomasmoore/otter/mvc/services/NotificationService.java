package com.thomasmoore.otter.mvc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thomasmoore.otter.mvc.models.Notification;
import com.thomasmoore.otter.mvc.repositories.NotificationRepository;

@Service
public class NotificationService {
	
	@Autowired
	private NotificationRepository notificationRepo;
	
	//Create
	public Notification create(Notification notification) {
		return notificationRepo.save(notification);
	}
	
	
	//Read
	public List<Notification> findAllByRecipientId(Long recipientId){
		return notificationRepo.findAllByRecipientId(recipientId);
	}
	
	public List<Notification> findAllBySenderId(Long senderId){
		return notificationRepo.findAllBySenderId(senderId);
	}
	
	//Update
	
	//Delete
	public void deleteById(Long id) {
		notificationRepo.deleteById(id);
	}
}
