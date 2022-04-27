package com.thomasmoore.otter.mvc.services;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.thomasmoore.otter.mvc.models.LoginUser;
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
		System.out.println("Running findAll");
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
	
	//Login
	public User login(LoginUser loginUser, BindingResult result) {
		User potentialUser = userRepo.findOneByEmail(loginUser.getEmail());
		if(potentialUser == null) {
			result.rejectValue("email", "EMAILDNE", "This email does not exist.");
			return null;
		}
		if(!BCrypt.checkpw(loginUser.getPassword(), potentialUser.getPassword())) {
			result.rejectValue("password", "INCORRECTPASS", "password");
			return null;
		}
		return potentialUser;
	}
	
	
	
}
