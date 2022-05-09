package com.thomasmoore.otter.mvc.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thomasmoore.otter.mvc.dtos.PostDTO;
import com.thomasmoore.otter.mvc.models.Post;
import com.thomasmoore.otter.mvc.models.User;
import com.thomasmoore.otter.mvc.repositories.PostRepository;

@Service
public class PostService {
	@Autowired
	private PostRepository postRepo;
	
	@Autowired
	private FriendshipService friendshipServ;
	
	@Autowired
	private UserService userServ;
	
	//CREATE
	public PostDTO create(Post post) {
		return this.convertEntityToDto(postRepo.save(post));
	}
	
	//READ
	public List<PostDTO> findAll(){
		return postRepo.findAll()
				.stream()
				.map(this::convertEntityToDto)
				.collect(Collectors.toList());
	}
	
	public Post findOneById(Long id) {
		Optional<Post> optPost = postRepo.findById(id);
		if(optPost.isPresent()) {
			return optPost.get();
		}
		return null;
	}
	
	public List<PostDTO> findUserPostsById(Long userId){
		User user = userServ.findOneByIdNonDto(userId);
		if(user == null) {
			return null;
		}
		return user.getPosts()
			   .stream()
			   .map(this::convertEntityToDto)
			   .collect(Collectors.toList());
	}
	
	public List<PostDTO> findFriendPostDtos(Long userId){
		List<User> friends = friendshipServ.findAllFriendIds(userId)
				.stream()
				.map((id) -> userServ.findOneByIdNonDto(id))
				.collect(Collectors.toList());
		List<PostDTO> friendPosts = new ArrayList<PostDTO>();
		for(User friend : friends) {
			for(Post post : friend.getPosts()) {
				friendPosts.add(this.convertEntityToDto(post));
			}
		}
		for(Post post : userServ.findOneByIdNonDto(userId).getPosts()) {
			friendPosts.add(this.convertEntityToDto(post));
		}
		return friendPosts;		
	}
	
	//UPDATE
	public Post update(Post post) {
		return postRepo.save(post);
	}
	
	
	//DELETE
	public void deleteById(Long id) {
		postRepo.deleteById(id);
	}
	
	//DTO
	public PostDTO convertEntityToDto(Post post) {
		PostDTO postDTO = new PostDTO();
		postDTO.setPostId(post.getId());
		postDTO.setMessage(post.getMessage());
		postDTO.setUserId(post.getUser().getId());
		postDTO.setFirstName(post.getUser().getFirstName());
		postDTO.setLastName(post.getUser().getLastName());
		postDTO.setImageUrl(post.getImageUrl());
		postDTO.setProfileImageUrl(post.getUser().getProfileImageUrl());
		postDTO.setCreatedAt(post.getCreated_at());
		return postDTO;
	}
}
