package com.thomasmoore.otter.mvc.dtos;

public class AddFriendship {
	private long firstUserId;
	private long secondUserId;
	
	public AddFriendship(){}
	
	public AddFriendship(long firstUserId, long secondUserId) {
		this.firstUserId = firstUserId;
		this.secondUserId = secondUserId;
	}

	public long getFirstUserId() {
		return firstUserId;
	}

	public void setFirstUserId(long firstUserId) {
		this.firstUserId = firstUserId;
	}

	public long getSecondUserId() {
		return secondUserId;
	}

	public void setSecondUserId(long secondUserId) {
		this.secondUserId = secondUserId;
	}
	
	
	
}
