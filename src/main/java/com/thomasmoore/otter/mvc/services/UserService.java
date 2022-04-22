package com.thomasmoore.otter.mvc.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thomasmoore.otter.mvc.models.User;
import com.thomasmoore.otter.mvc.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	//CREATE
	public User create(User user) {
		return userRepo.save(user);
	}
	
	//READ
	public List<User> findAll(){
		return userRepo.findAll();
	}
	
	public User findOneById(Long id) {
		Optional<User> optUser = userRepo.findById(id);
		if(optUser.isPresent()) {
			return optUser.get();
		}
		return null;
	}
		
	//UPDATE
	public User update(User user) {
		return userRepo.save(user);
	}
		
	//DELETE
	public void delete(Long id) {
		userRepo.deleteById(id);
	}
}
