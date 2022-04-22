package com.thomasmoore.otter.mvc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.thomasmoore.otter.mvc.models.User;
import com.thomasmoore.otter.mvc.services.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userServ;
	
	//================== Create ==================
	
	@PostMapping("/api/users/create")
	public User createUser(@RequestBody User user) {
		return userServ.create(user);
	}
	
	//================== Read ==================
	@GetMapping("/api/users")
	public List<User> allUsers(){
		return userServ.findAll();
	}
	
	@GetMapping("/api/users/{id}")
	public User userById(@PathVariable("id") Long id) {
		return userServ.findOneById(id);
	}
	
	//================== Update ==================
	@PutMapping("/api/users/update")
	public User updateUser(@RequestBody User user) {
		return userServ.update(user);
	}
	
	//================== Delete ==================
	@DeleteMapping("/api/users/delete/{id}")
	public void deleteUser(@PathVariable("id") Long id) {
		userServ.delete(id);
	}
}
