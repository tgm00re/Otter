package com.thomasmoore.otter.mvc.services;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.thomasmoore.otter.mvc.dtos.EditAccountInformation;
import com.thomasmoore.otter.mvc.dtos.UserDTO;
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
	public List<UserDTO> findAll(){
		return userRepo.findAll()
				.stream()
				.map(this::convertEntityToDto)
				.collect(Collectors.toList());
	}
	
	public UserDTO findOneById(Long id) {
		Optional<User> optUser = userRepo.findById(id);
		if(optUser.isPresent()) {
			return this.convertEntityToDto(optUser.get());
		}
		return null;
	}
	
	//Used for backend data transfer only.
	public User findOneByIdNonDto(Long id) {
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
	
	public HashMap<String, String> validateEditAccountInformation(EditAccountInformation editAcc){
		HashMap<String, String> errors = new HashMap<String, String>();
		if(editAcc.getFirstName().length() < 2) {
			errors.put("firstName", "First name must be 2 or more characters");
		}
		if(editAcc.getLastName().length() < 2) {
			errors.put("lastName", "Last name must be 2 or more characters");
		}
		return errors;
		
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
	
	//DTO
	public UserDTO convertEntityToDto(User user) {
		UserDTO userDto = new UserDTO();
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setUserId(user.getId());
		userDto.setUserLevel(user.getUserLevel());
		userDto.setProfileImageUrl(user.getProfileImageUrl());
		userDto.setBiography(user.getBiography());
		userDto.setEmail(user.getEmail());
		return userDto;
	}
	
	
	
}
