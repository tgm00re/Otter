package com.thomasmoore.otter.mvc.controllers;

import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.thomasmoore.otter.mvc.dtos.EditAccountInformation;
import com.thomasmoore.otter.mvc.dtos.UserDTO;
import com.thomasmoore.otter.mvc.models.LoginUser;
import com.thomasmoore.otter.mvc.models.User;
import com.thomasmoore.otter.mvc.services.UserService;

@CrossOrigin
@RestController
public class UserController {
	
	@Autowired
	private UserService userServ;
	
	//================== Create ==================
	
	@PostMapping("/api/users/create")
	public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
		System.out.println("hiya!");
		user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
		System.out.println("Hello, World!");
		return ResponseEntity.ok(userServ.create(user));
	}
	
	//================== Read ==================
	@GetMapping("/api/users")
	public List<UserDTO> allUsers(){
		return userServ.findAll();
	}
	
	@GetMapping("/api/users/{id}")
	public UserDTO userById(@PathVariable("id") Long id) {
		return userServ.findOneById(id);
	}
	
	//================== Update ==================
	@PutMapping("/api/users/update")
	public Object updateUser(@Valid @RequestBody EditAccountInformation updateInfo, BindingResult result) {
		HashMap<String, String> errors = userServ.validateEditAccountInformation(updateInfo);
		if(errors.size() > 0) {
			return errors;
		}
		User userToUpdate = userServ.findOneByIdNonDto(updateInfo.getId());
		userToUpdate.setFirstName(updateInfo.getFirstName());
		userToUpdate.setLastName(updateInfo.getLastName());
		userToUpdate.setProfileImageUrl(updateInfo.getProfileImageUrl());
		userToUpdate.setBiography(updateInfo.getBiography());
		return ResponseEntity.ok(userServ.update(userToUpdate));
	}
	
	//================== Delete ==================
	@DeleteMapping("/api/users/delete/{id}")
	public void deleteUser(@PathVariable("id") Long id) {
		userServ.delete(id);
	}
	
	//================== Login ==================
	@PostMapping("/api/users/login")
	public Object loginUser(@Valid @RequestBody LoginUser loginUser, BindingResult result) {
		System.out.println("HELLO!");
		User user = userServ.login(loginUser, result);
		if(result.hasErrors()) {
			return result.getAllErrors();
		}
		return userServ.convertEntityToDto(user);
	}
}
