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

import com.thomasmoore.otter.mvc.dtos.AddFriendship;
import com.thomasmoore.otter.mvc.models.Friendship;
import com.thomasmoore.otter.mvc.models.User;
import com.thomasmoore.otter.mvc.services.FriendshipService;
import com.thomasmoore.otter.mvc.services.UserService;


@CrossOrigin
@RestController
public class FriendshipController {
	
	@Autowired
	private FriendshipService friendshipServ;
	
	@Autowired
	private UserService userServ;
	
	@PostMapping("/api/friendships/create")
	public Friendship createFriendship(@RequestBody AddFriendship addFriendship) {
		User firstUser = userServ.findOneByIdNonDto(addFriendship.getFirstUserId());
		User secondUser = userServ.findOneByIdNonDto(addFriendship.getSecondUserId());
		Friendship friendship = new Friendship();
		friendship.setFirstUser(firstUser);
		friendship.setSecondUser(secondUser);
		return friendshipServ.create(friendship);
	}
	
	@DeleteMapping("api/friendships/delete/{firstUserId}/{secondUserId}")
	public void deleteFriendship(@PathVariable("firstUserId") Long firstUserId, @PathVariable("secondUserId") Long secondUserId) {
		friendshipServ.deleteByIds(firstUserId, secondUserId);
	}
	
	@GetMapping("/api/friendships/findAllFriends/{id}")
	public List<Long> findFriendIds(@PathVariable("id") Long id){
		return friendshipServ.findAllFriendIds(id);
	}
	

}
