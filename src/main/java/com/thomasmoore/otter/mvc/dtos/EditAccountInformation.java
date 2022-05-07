package com.thomasmoore.otter.mvc.dtos;

public class EditAccountInformation {
	private long id;
	private String firstName;
	private String lastName;
	private String profileImageUrl;
	private String biography;
	
	public EditAccountInformation(long id, String firstName, String lastName, String profileImageUrl,
			String biography) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.profileImageUrl = profileImageUrl;
		this.biography = biography;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getProfileImageUrl() {
		return profileImageUrl;
	}

	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}

	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}
	
	
	
	
}
