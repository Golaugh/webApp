/**
 * BSD 3-Clause License
 *
 * Copyright (C) 2018 Steven Atkinson <steven@nowucca.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package business.customer;

import api.ApiException;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Calendar;
import java.util.Date;

/**
 *
 */

public class CustomerForm {

    private String name;

	private String address;

    private String phone;

	private String email;

    private String ccNumber;

    private String ccExpiryMonth;

    private String ccExpiryYear;

	private Date ccExpiryDate;

    @JsonCreator
	public CustomerForm(
		@JsonProperty("name") String name,
		@JsonProperty("address") String address,
		@JsonProperty("phone") String phone,
		@JsonProperty("email") String email,
		@JsonProperty("ccNumber") String ccNumber,
		@JsonProperty("ccExpiryMonth") String ccExpiryMonth,
		@JsonProperty("ccExpiryYear") String ccExpiryYear,
		@JsonProperty("ccExpiryDate") Date ccExpiryDate) {
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.email = email;
		this.ccNumber = ccNumber;
		this.ccExpiryMonth = ccExpiryMonth;
		this.ccExpiryYear = ccExpiryYear;
		this.ccExpiryDate = ccExpiryDate;
	}

	public String getName() {
        return name;
    }

	public String getAddress() {
		return address;
	}

    public String getPhone() {
        return phone;
    }

	public String getEmail() {
		return email;
	}

	public String getCcNumber() {
        return ccNumber;
    }

	public String getCcExpiryMonth() {
		return ccExpiryMonth;
	}

	public String getCcExpiryYear() {
		return ccExpiryYear;
	}

	public Date getCcExpiryDate() {
		return getCardExpirationDate(ccExpiryMonth, ccExpiryYear);
	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		try {
			int month = Integer.parseInt(monthString);
			int year = Integer.parseInt(yearString);
			Calendar calendar = Calendar.getInstance();
			calendar.set(Calendar.YEAR, year);
			calendar.set(Calendar.MONTH, month - 1);
			calendar.set(Calendar.DAY_OF_MONTH, 1);
			calendar.clear(Calendar.HOUR_OF_DAY);
			calendar.clear(Calendar.MINUTE);
			calendar.clear(Calendar.SECOND);
			calendar.clear(Calendar.MILLISECOND);
			return calendar.getTime();
		} catch (NumberFormatException e) {
			throw new ApiException.ValidationFailure("Invalid expiration date format");
		}
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setCcNumber(String ccNumber) {
		this.ccNumber = ccNumber;
	}

	public void setCcExpiryMonth(String ccExpiryMonth) {
		this.ccExpiryMonth = ccExpiryMonth;
	}

	public void setCcExpiryYear(String ccExpiryYear) {
		this.ccExpiryYear = ccExpiryYear;
	}
}
