package com.thomasmoore.otter.mvc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.thomasmoore.otter.mvc.models.Notification;
import com.thomasmoore.otter.mvc.services.NotificationService;

@CrossOrigin
@RestController
public class NotificationController {

	@Autowired
	private NotificationService notificationServ;
	
	@PostMapping("/api/notifications/create")
	public Notification create(@RequestBody Notification notification) {
		return notificationServ.create(notification);
	}
	
	
	@GetMapping("/api/notifications/find/received/{recipientId}")
	public List<Notification> findAllByRecipientId(@PathVariable("recipientId") Long recipientId){
		return notificationServ.findAllByRecipientId(recipientId);
	}
	
	@GetMapping("/api/notifications/find/sent/{senderId}")
	public List<Notification> findAllBySenderId(@PathVariable("senderId") Long senderId){
		return notificationServ.findAllBySenderId(senderId);
	}
	
	@DeleteMapping("/api/notifications/delete/{id}")
	public void deleteById(@PathVariable("id") Long id) {
		System.out.println("HELLO B)");
		notificationServ.deleteById(id);
	}
	
}
