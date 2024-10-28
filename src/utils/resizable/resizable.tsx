import React, { FC, useRef, useState, MouseEvent, MouseEventHandler, SyntheticEvent } from 'react';
import css from './resizable.module.css';
import { useDispatch } from '../../services/types/hooks';
import { resizeWindow, toActiveWindow } from '../../services/actions/open-windows';

const Resizable = (props:any) => {


// dispatch(toActiveWindow(props.id));

    const resizableRef = useRef<HTMLDivElement>();

    const dispatch = useDispatch();

    const minWinWidth = 90;
    const minWinHeight = 40;

    const { maxWidth, minWidth, maxHeight, minHeight } = props.winProps;
    
    const resizeRight = (e:MouseEvent<HTMLDivElement>) => {
        if(props.isExpand||!props.winProps.canResize) return false;

        const node = e.currentTarget.parentNode as HTMLDivElement;
        const parent = node.parentNode as HTMLDivElement;
        const parentNode = parent.getBoundingClientRect();
        const init = node.getBoundingClientRect();

        document.onmousemove = (e) => {
            let width = init.width + (e.clientX - init.right);

            if(e.clientX>parentNode.right) width = parentNode.width - init.left;

            if(minWidth&&width<minWidth) width = minWidth;
            if(width<minWinWidth) width = minWinWidth;

            node.style.width = width+'px';
        };
    }

    const resizeBottom = (e:MouseEvent<HTMLDivElement>) => {
        if(props.isExpand||!props.winProps.canResize) return false;

        const node = e.currentTarget.parentNode as HTMLDivElement;
        const parent = node.parentNode as HTMLDivElement;
        const parentNode = parent.getBoundingClientRect();
        const init = node.getBoundingClientRect();

        document.onmousemove = (e) => {
            let height = init.height + (e.clientY - init.bottom);
            
            if(e.clientY>parentNode.bottom) height = parentNode.height - init.top;

            if(minHeight&&height<minHeight) height = minHeight;
            if(height<minWinHeight) height = minWinHeight;

            node.style.height = height+'px';
        };
    }

    const resizeLeft = (e:MouseEvent<HTMLDivElement>) => {
        if(props.isExpand||!props.winProps.canResize) return false;

        const node = e.currentTarget.parentNode as HTMLDivElement;
        const parent = node.parentNode as HTMLDivElement;
        const parentNode = parent.getBoundingClientRect();
        const init = node.getBoundingClientRect();

        document.onmousemove = (e) => {
            let width = init.right - e.clientX;
            let left = e.clientX;

            if(e.clientX<parentNode.left) {
                width = init.right;
                left = parentNode.left;
            }

            if(minWidth&&width<minWidth) {
                width = minWidth;
                left = init.right - minWidth;
            }

            if(width<minWinWidth) {
                width = minWinWidth;
                left = init.right - minWinWidth;
            }

            node.style.width = width+'px';
            node.style.left = left+'px';
        };
    }

    const resizeTop = (e:MouseEvent<HTMLDivElement>) => {
        if(props.isExpand||!props.winProps.canResize) return false;

        const node = e.currentTarget.parentNode as HTMLDivElement;
        const parent = node.parentNode as HTMLDivElement;
        const parentNode = parent.getBoundingClientRect();
        const init = node.getBoundingClientRect();

        document.onmousemove = (e) => {
            let height = init.bottom - e.clientY;
            let top = e.clientY;

            if(e.clientY<parentNode.top) {
                height = init.bottom;
                top = parentNode.top;
            }
            
            if(minHeight&&height<minHeight) {
                height = minHeight;
                top = init.bottom - minHeight;
            }

            if(height<minWinHeight) {
                height = minWinHeight;
                top = init.bottom - minWinHeight;
            }

            node.style.height = height+'px';
            node.style.top = top+'px';
        };
    }

    const resizeTopRight = (e:MouseEvent<HTMLDivElement>) => {
        if(props.isExpand||!props.winProps.canResize) return false;

        const node = e.currentTarget.parentNode as HTMLDivElement;
        const parent = node.parentNode as HTMLDivElement;
        const parentNode = parent.getBoundingClientRect();
        const init = node.getBoundingClientRect();

        document.onmousemove = (e) => {
            let height = init.bottom - e.clientY;
            let top = e.clientY;
            let width = init.width + (e.clientX - init.right);

            if(e.clientY<parentNode.top) {
                height = init.bottom;
                top = parentNode.top;
            }

            if(e.clientX>parentNode.right) width = parentNode.width - init.left;

            if(minWidth&&width<minWidth) width = minWidth;
            if(width<minWinWidth) width = minWinWidth;

            if(minHeight&&height<minHeight) {
                height = minHeight;
                top = init.bottom - minHeight;
            }

            if(height<minWinHeight) {
                height = minWinHeight;
                top = init.bottom - minWinHeight;
            }

            node.style.width = width+'px';
            node.style.height = height+'px';
            node.style.top = top+'px';
        };
    }

    const resizeTopLeft = (e:MouseEvent<HTMLDivElement>) => {
        if(props.isExpand||!props.winProps.canResize) return false;

        const node = e.currentTarget.parentNode as HTMLDivElement;
        const parent = node.parentNode as HTMLDivElement;
        const parentNode = parent.getBoundingClientRect();
        const init = node.getBoundingClientRect();

        document.onmousemove = (e) => {
            let height = init.bottom - e.clientY;
            let top = e.clientY;
            let width = init.right - e.clientX;
            let left = e.clientX;

            if(e.clientY<parentNode.top) {
                height = init.bottom;
                top = parentNode.top;
            }

            if(e.clientX<parentNode.left) {
                width = init.right;
                left = parentNode.left;
            }

            if(minHeight&&height<minHeight) {
                height = minHeight;
                top = init.bottom - minHeight;
            }

            if(height<minWinHeight) {
                height = minWinHeight;
                top = init.bottom - minWinHeight;
            }

            if(minWidth&&width<minWidth) {
                width = minWidth;
                left = init.right - minWidth;
            }

            if(width<minWinWidth) {
                width = minWinWidth;
                left = init.right - minWinWidth;
            }

            node.style.width = width+'px';
            node.style.left = left+'px';
            node.style.height = height+'px';
            node.style.top = top+'px';
        };
    }

    const resizeBottomRight = (e:MouseEvent<HTMLDivElement>) => {
        if(props.isExpand||!props.winProps.canResize) return false;

        const node = e.currentTarget.parentNode as HTMLDivElement;
        const parent = node.parentNode as HTMLDivElement;
        const parentNode = parent.getBoundingClientRect();
        const init = node.getBoundingClientRect();

        document.onmousemove = (e) => {
            let width = init.width + (e.clientX - init.right);
            let height = init.height + (e.clientY - init.bottom);

            if(e.clientX>parentNode.right) width = parentNode.width - init.left;
            if(e.clientY>parentNode.bottom) height = parentNode.height - init.top;

            if(minHeight&&height<minHeight) height = minHeight;
            if(height<minWinHeight) height = minWinHeight;
            if(minWidth&&width<minWidth) width = minWidth;
            if(width<minWinWidth) width = minWinWidth;

            node.style.width = width+'px';
            node.style.height = height+'px';
        };
    }

    const resizeBottomLeft = (e:MouseEvent<HTMLDivElement>) => {
        if(props.isExpand||!props.winProps.canResize) return false;

        const node = e.currentTarget.parentNode as HTMLDivElement;
        const parent = node.parentNode as HTMLDivElement;
        const parentNode = parent.getBoundingClientRect();
        const init = node.getBoundingClientRect();

        document.onmousemove = (e) => {
            let width = init.right - e.clientX;
            let left = e.clientX;
            let height = init.height + (e.clientY - init.bottom);

            if(e.clientX<parentNode.left) {
                width = init.right;
                left = parentNode.left;
            }

            if(e.clientY>parentNode.bottom) height = parentNode.height - init.top;
            
            if(minHeight&&height<minHeight) height = minHeight;
            if(height<minWinHeight) height = minWinHeight;

            if(minWidth&&width<minWidth) {
                width = minWidth;
                left = init.right - minWidth;
            }

            if(width<minWinWidth) {
                width = minWinWidth;
                left = init.right - minWinWidth;
            }

            node.style.height = height+'px';
            node.style.width = width+'px';
            node.style.left = left+'px';
        };
    }

    const resizeStop = (e:MouseEvent<HTMLDivElement>) => {
        const node = e.currentTarget.parentNode as HTMLDivElement;

        const mod = node.getBoundingClientRect();

        dispatch(resizeWindow(props.id, {
            top: mod.top,
            left: mod.left,
            width: mod.width,
            height: mod.height
        }));

        document.onmousemove = null;
    }
    
    return(
        <div className={css.resizable} style={{...props.style}} ref={props.refs} {...props.attributes}>
            {!props.isExpand&&props.winProps.canResize&&
            <>
            <div className={css.handleTop} onMouseDown={resizeTop} onMouseUp={resizeStop}></div>
            <div className={css.handleRight} onMouseDown={resizeRight} onMouseUp={resizeStop}></div>
            <div className={css.handleBottom} onMouseDown={resizeBottom} onMouseUp={resizeStop}></div>
            <div className={css.handleLeft} onMouseDown={resizeLeft} onMouseUp={resizeStop}></div>
            <div className={css.handleTopRight} onMouseDown={resizeTopRight} onMouseUp={resizeStop}></div>
            <div className={css.handleBottomRight} onMouseDown={resizeBottomRight} onMouseUp={resizeStop}></div>
            <div className={css.handleBottomLeft} onMouseDown={resizeBottomLeft} onMouseUp={resizeStop}></div>
            <div className={css.handleTopLeft} onMouseDown={resizeTopLeft} onMouseUp={resizeStop}></div>
            </>
            }
            {props.children}
        </div>
    )
}

export default Resizable;