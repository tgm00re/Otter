package com.thomasmoore.otter.mvc.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thomasmoore.otter.mvc.models.Friendship;
import com.thomasmoore.otter.mvc.repositories.FriendshipRepository;


@Service
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
	
	public List<Long> findAllFriendIds(Long id){
		//Getting the friendships involving the user with the given id.
		List<Friendship> firstList = friendshipRepo.findByFirstUserId(id); //SEcond id will be the friend id
		List<Friendship> secondList = friendshipRepo.findBySecondUserId(id); //First id will be the friend id
	
		//Now we create a lists that will contain the ids of all the user with the given id's friends.
		List<Long> friendIds = new ArrayList<Long>();
		for(int i = 0; i < firstList.size(); i++) {
			friendIds.add(firstList.get(i).getSecondUser().getId());
		}
		for(int i = 0;i < secondList.size(); i++) {
			friendIds.add(secondList.get(i).getFirstUser().getId());
		}
		return friendIds;
	}
		
	//UPDATE
	public Friendship update(Friendship friendship) {
		return friendshipRepo.save(friendship);
	}
		
	//DELETE
	public void delete(Long id) {
		friendshipRepo.deleteById(id);
	}
	
	
	public void deleteByIds(long firstUserId, long secondUserId) {
//		//We call this twice with swapped values because we need to account for both possible friendships.
//		System.out.println("I have the highground now!");
//		friendshipRepo.deleteByFirstUserIdAndSecondUserId(firstUserId, secondUserId);
//		System.out.println("No, look above you - big bird");
////		friendshipRepo.deleteByFirstUserIdAndSecondUserId(firstUserId, secondUserId);
//		System.out.println("aetaet");
		List<Friendship> all = this.findAll();
		for(Friendship fs : all) {
			if((fs.getFirstUser().getId() == firstUserId && fs.getSecondUser().getId() == secondUserId) || (fs.getFirstUser().getId() == secondUserId && fs.getSecondUser().getId() == firstUserId)) {
				this.delete(fs.getId());
				break;
			}
		}
	}
}
