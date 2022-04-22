package com.thomasmoore.otter.mvc.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thomasmoore.otter.mvc.models.Post;
import com.thomasmoore.otter.mvc.repositories.PostRepository;

@Service
public class PostService {
	@Autowired
	private PostRepository postRepo;
	
	//CREATE
	public Post create(Post post) {
		return postRepo.save(post);
	}
	
	//READ
	public List<Post> findAll(){
		return postRepo.findAll();
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
}
