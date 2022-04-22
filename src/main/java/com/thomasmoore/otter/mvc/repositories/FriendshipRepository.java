package com.thomasmoore.otter.mvc.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thomasmoore.otter.mvc.models.Friendship;

@Repository
public interface FriendshipRepository extends CrudRepository<Friendship, Long>{
	List<Friendship> findAll();
}
