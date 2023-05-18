import React from "react";
import PropTypes from "prop-types"

export interface dbGameEntry {
  name: string 
  slug: string
  upvotes: number
  downvotes: number
  metacritic: number | string
  hasUpvoted?: string
  hasDownvoted?: string
  id?: string
}

export interface searchFor {
  name: string;
  slug: string;
  metacritic: number;
}

export interface searchProps {
  user: string;
}
