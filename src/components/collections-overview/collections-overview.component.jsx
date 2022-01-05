import React from "react";
import './collections-overview.styles.scss';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import  CollectionPreview from "../preview-collection/preview-collection.component";
import { selectCollections } from "../../redux/shop/shop.selectors";

const CollectionOverview = ({collections}) =>(
  <div className="collections-overview">
    { collections.map( ({id,...otherSectionProps}) =>(
            <CollectionPreview key={id} {...otherSectionProps} />
        ))
        }
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections:selectCollections
});

export default connect(mapStateToProps)(CollectionOverview);