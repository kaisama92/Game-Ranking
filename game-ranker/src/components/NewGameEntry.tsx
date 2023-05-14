import React from "react";
import PropTypes from "prop-types"

export interface dbGameEntry {
  name: string 
  slug: string
  upvotes: number
  downvotes: number
  metacritic: number

}

export interface currentlyVisibleStateProps {
  changeCurrentlyVisibleState?: () => void;
}