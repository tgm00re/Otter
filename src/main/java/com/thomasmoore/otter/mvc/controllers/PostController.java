package com.thomasmoore.otter.mvc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.thomasmoore.otter.mvc.dtos.PostDTO;
import com.thomasmoore.otter.mvc.models.Post;
import com.thomasmoore.otter.mvc.models.User;
import com.thomasmoore.otter.mvc.services.PostService;
import com.thomasmoore.otter.mvc.services.UserService;


@CrossOrigin
@RestController
public class PostController {

	@Autowired
	private PostService postServ;
	
	
	@Autowired
	private UserService userServ;
	
	//================== Create ==================
	@PostMapping("/api/posts/create/{userId}")
	public ResponseEntity<PostDTO> createPost(@RequestBody Post post, @PathVariable("userId") Long userId) {
		User loggedInUser = userServ.findOneByIdNonDto(userId);
		post.setUser(loggedInUser);
		return ResponseEntity.ok(postServ.create(post));
	}
	
	//================== Read ==================
	@GetMapping("/api/posts")
	public List<PostDTO> allPosts(){
		return postServ.findAll();
	}
	
	@GetMapping("/api/posts/{id}")
	public Post postById(@PathVariable("id") Long id) {
		return postServ.findOneById(id);
	}
	
	//================== Update ==================
	@PutMapping("/api/posts/update")
	public Post updatePost(@RequestBody Post post) {
		return postServ.update(post);
	}
	
	
	//================== Delete ==================
	@DeleteMapping("/api/posts/delete/{id}")
	public void deletePost(@PathVariable("id") Long id) {
		postServ.deleteById(id);
	}
}
