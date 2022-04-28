package com.thomasmoore.otter.mvc.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thomasmoore.otter.mvc.dtos.PostDTO;
import com.thomasmoore.otter.mvc.models.Post;
import com.thomasmoore.otter.mvc.repositories.PostRepository;

@Service
public class PostService {
	@Autowired
	private PostRepository postRepo;
	
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
		return postDTO;
	}
}
