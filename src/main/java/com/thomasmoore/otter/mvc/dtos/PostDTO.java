package com.thomasmoore.otter.mvc.dtos;

public class PostDTO {
	private long postId;
	private long userId;
	private String message;
	private String firstName;
	private String lastName;
	
	
	public PostDTO() {
		
	}


	public PostDTO(long postId, long userId, String message, String firstName, String lastName) {
		super();
		this.postId = postId;
		this.userId = userId;
		this.message = message;
		this.firstName = firstName;
		this.lastName = lastName;
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
	
	
	
	
}
