package com.thomasmoore.otter.mvc.dtos;

public class UserDTO {
	private String firstName;
	private String lastName;
	private long userId;
	private short userLevel;
	
	public UserDTO() {}

	public UserDTO(String firstName, String lastName, long userId, short userLevel) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.userId = userId;
		this.userLevel = userLevel;
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

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public short getUserLevel() {
		return userLevel;
	}

	public void setUserLevel(short userLevel) {
		this.userLevel = userLevel;
	}
	
	
	
}
