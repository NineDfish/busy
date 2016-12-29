import { connect } from 'react-redux';
import { Link } from 'react-router';
import React from 'react';
import _ from 'lodash';

import Header from '../../app/Header';
import Icon from '../../widgets/Icon';
import { deleteDraft } from './EditorActions';

let DraftRow = (props) => {
  const { id, data } = props;
  let { title = '', body = '' } = data;
  title = title.trim();
  body = body.replace(/\r?\n|\r|[\u200B-\u200D\uFEFF]/g, ' ').substring(0, 50);
  let draftTitle = title.length ? title : body;
  draftTitle = draftTitle.trim();
  if (draftTitle.length === 0) {
    draftTitle = 'Untitled Draft';
  }
  return (<div>
    <Link to={{ pathname: '/write', query: { draft: id } }}>{draftTitle}</Link>
    <a onClick={() => { props.deleteDraft(id); }}><Icon name="cancel" /></a>
  </div>);
};

DraftRow = connect(() => ({}), { deleteDraft })(DraftRow);

const DraftList = ({ editor: { draftPosts } }) =>
  (
    <div className="main-panel">
      <Header />
      <div className="container my-3">
        Your Drafts
          {_.map(draftPosts, (draft, key) => <DraftRow key={key} data={draft.postData} id={key} />)}
      </div>
    </div>
  );

export default connect(state => ({ editor: state.editor }))(DraftList);
