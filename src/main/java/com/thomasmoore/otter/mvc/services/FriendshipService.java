package com.thomasmoore.otter.mvc.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.thomasmoore.otter.mvc.models.Friendship;
import com.thomasmoore.otter.mvc.repositories.FriendshipRepository;

public class FriendshipService {

	
	@Autowired
	private FriendshipRepository friendshipRepo;
	
	//CREATE
	public Friendship create(Friendship friendship) {
		return friendshipRepo.save(friendship);
	}
	
	//READ
	public List<Friendship> findAll(){
		return friendshipRepo.findAll();
	}
	
	public Friendship findOneById(Long id) {
		Optional<Friendship> optFriendship = friendshipRepo.findById(id);
		if(optFriendship.isPresent()) {
			return optFriendship.get();
		}
		return null;
	}
		
	//UPDATE
	public Friendship update(Friendship friendship) {
		return friendshipRepo.save(friendship);
	}
		
	//DELETE
	public void delete(Long id) {
		friendshipRepo.deleteById(id);
	}
}
