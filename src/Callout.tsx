import React, { FunctionComponent, ComponentProps } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import errorSVG from '../img/callout-error.svg';
import infoSVG from '../img/callout-info.svg';
import pendingSVG from '../img/callout-pending.svg';
import warningSVG from '../img/callout-warning.svg';

export type Callouts = "pending" | "info" | "warning" | "error";

type SVGs_ = { [K in Callouts]: string };

const SVGs: SVGs_ = {
  pending: pendingSVG,
  info: infoSVG,
  warning: warningSVG,
  error: errorSVG,
};

export type CalloutProps = Omit<ComponentProps<'aside'>, 'title'> & {
  isPending?: boolean;
  isWarning?: boolean;
  isError?: boolean;
  title?: React.ReactNode;
};

export const Callout: FunctionComponent<CalloutProps> = ({ title, isPending, isWarning, isError, children, className, ...rest }) => {
  let kind: Callouts = 'info';
  if (isPending) {
    kind = 'pending';
  } else if (isWarning) {
    kind = 'warning';
  } else if (isError) {
    kind = 'error';
  }

  return <aside
    className={classNames('ods-callout', className, {
      'is-ods-callout-help': !isPending && !isWarning && !isError,
      'is-ods-callout-pending': isPending,
      'is-ods-callout-warning': isWarning,
      'is-ods-callout-error': isError,
    })}
    aria-live={ isError ? "polite" : undefined}
    role={ isError ? 'alert' : undefined}
    {...rest}
  >
    <img alt={kind} src={ SVGs[kind] } style={{ height: 24, width: 24, marginRight: 8 }} />
    <div className="ods-callout--content">
      { title && <h1 className="ods-callout--title">
        { title }
      </h1> }
      { children }
    </div>
  </aside>;
};

Callout.propTypes = {
  isPending: PropTypes.bool,
  isWarning: PropTypes.bool,
  isError: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.node,
};
