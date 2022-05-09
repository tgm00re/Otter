package com.thomasmoore.otter.mvc.dtos;

import java.util.Date;

public class PostDTO {
	private long postId;
	private long userId;
	private String message;
	private String firstName;
	private String lastName;
	private String imageUrl;
	private String profileImageUrl;
	private Date createdAt;
	
	
	public PostDTO() {
		
	}


	public PostDTO(long postId, long userId, String message, String firstName, String lastName, String imageUrl, String profileImageUrl, Date createdAt) {
		super();
		this.postId = postId;
		this.userId = userId;
		this.message = message;
		this.firstName = firstName;
		this.lastName = lastName;
		this.imageUrl = imageUrl;
		this.profileImageUrl = profileImageUrl;
		this.createdAt = createdAt;
	}


	public long getPostId() {
		return postId;
	}


	public void setPostId(long postId) {
		this.postId = postId;
	}


	public long getUserId() {
		return userId;
	}


	public void setUserId(long userId) {
		this.userId = userId;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public String getProfileImageUrl() {
		return profileImageUrl;
	}


	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}


	public Date getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	
	
	
}
