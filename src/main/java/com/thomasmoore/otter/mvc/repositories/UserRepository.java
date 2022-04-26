package com.thomasmoore.otter.mvc.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.thomasmoore.otter.mvc.models.User;

public interface UserRepository extends CrudRepository<User, Long>{
	List<User> findAll();
	
	User findOneByEmail(String email);
}
