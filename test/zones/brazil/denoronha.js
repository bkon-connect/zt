"use strict";

var helpers = require("../../helpers/helpers");

exports["Brazil/DeNoronha"] = {
	"1914" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1914-01-01T02:09:39+00:00", "23:59:59", "LMT", 7780 / 60],
		["1914-01-01T02:09:40+00:00", "00:09:40", "FNT", 120]
	]),

	"1931" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1931-10-03T12:59:59+00:00", "10:59:59", "FNT", 120],
		["1931-10-03T13:00:00+00:00", "12:00:00", "FNST", 60]
	]),

	"1932" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1932-04-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1932-04-01T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1932-10-03T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1932-10-03T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1933" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1933-04-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1933-04-01T01:00:00+00:00", "23:00:00", "FNT", 120]
	]),

	"1949" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1949-12-01T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1949-12-01T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1950" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1950-04-16T01:59:59+00:00", "00:59:59", "FNST", 60],
		["1950-04-16T02:00:00+00:00", "00:00:00", "FNT", 120],
		["1950-12-01T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1950-12-01T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1951" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1951-04-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1951-04-01T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1951-12-01T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1951-12-01T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1952" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1952-04-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1952-04-01T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1952-12-01T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1952-12-01T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1953" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1953-03-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1953-03-01T01:00:00+00:00", "23:00:00", "FNT", 120]
	]),

	"1963" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1963-12-09T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1963-12-09T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1964" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1964-03-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1964-03-01T01:00:00+00:00", "23:00:00", "FNT", 120]
	]),

	"1965" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1965-01-31T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1965-01-31T02:00:00+00:00", "01:00:00", "FNST", 60],
		["1965-03-31T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1965-03-31T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1965-12-01T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1965-12-01T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1966" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1966-03-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1966-03-01T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1966-11-01T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1966-11-01T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1967" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1967-03-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1967-03-01T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1967-11-01T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1967-11-01T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1968" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1968-03-01T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1968-03-01T01:00:00+00:00", "23:00:00", "FNT", 120]
	]),

	"1985" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1985-11-02T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1985-11-02T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1986" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1986-03-15T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1986-03-15T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1986-10-25T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1986-10-25T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1987" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1987-02-14T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1987-02-14T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1987-10-25T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1987-10-25T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1988" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1988-02-07T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1988-02-07T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1988-10-16T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1988-10-16T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1989" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1989-01-29T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1989-01-29T01:00:00+00:00", "23:00:00", "FNT", 120],
		["1989-10-15T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1989-10-15T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"1990" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1990-02-11T00:59:59+00:00", "23:59:59", "FNST", 60],
		["1990-02-11T01:00:00+00:00", "23:00:00", "FNT", 120]
	]),

	"1999" : helpers.makeTestYear("Brazil/DeNoronha", [
		["1999-10-03T01:59:59+00:00", "23:59:59", "FNT", 120],
		["1999-10-03T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"2000" : helpers.makeTestYear("Brazil/DeNoronha", [
		["2000-02-27T00:59:59+00:00", "23:59:59", "FNST", 60],
		["2000-02-27T01:00:00+00:00", "23:00:00", "FNT", 120],
		["2000-10-08T01:59:59+00:00", "23:59:59", "FNT", 120],
		["2000-10-08T02:00:00+00:00", "01:00:00", "FNST", 60],
		["2000-10-15T00:59:59+00:00", "23:59:59", "FNST", 60],
		["2000-10-15T01:00:00+00:00", "23:00:00", "FNT", 120]
	]),

	"2001" : helpers.makeTestYear("Brazil/DeNoronha", [
		["2001-10-14T01:59:59+00:00", "23:59:59", "FNT", 120],
		["2001-10-14T02:00:00+00:00", "01:00:00", "FNST", 60]
	]),

	"2002" : helpers.makeTestYear("Brazil/DeNoronha", [
		["2002-02-17T00:59:59+00:00", "23:59:59", "FNST", 60],
		["2002-02-17T01:00:00+00:00", "23:00:00", "FNT", 120]
	])
};