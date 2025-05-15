import * as React from 'react'
import "./index.css";

interface State {
}

const guideGifs = [
    'https://cn.bing.com/images/search?view=detailV2&ccid=W5pnXKJR&id=1B01F449CA42A16CECD689532EFF8776E496DE5A&thid=OIP.W5pnXKJRIAgC0gyfCVpAsQHaFj&mediaurl=https%3a%2f%2fso1.360tres.com%2ft01f4d77fe2ee087f36.jpg&exph=494&expw=658&q=麦+黛薇卡&simid=607993484189912000&FORM=IRPRST&ck=AA6D3420620FF4C620EF9ACDF0940C1B&selectedIndex=4&itb=0',
    'https://cn.bing.com/images/search?view=detailV2&ccid=W5pnXKJR&id=1B01F449CA42A16CECD689532EFF8776E496DE5A&thid=OIP.W5pnXKJRIAgC0gyfCVpAsQHaFj&mediaurl=https%3a%2f%2fso1.360tres.com%2ft01f4d77fe2ee087f36.jpg&exph=494&expw=658&q=麦+黛薇卡&simid=607993484189912000&FORM=IRPRST&ck=AA6D3420620FF4C620EF9ACDF0940C1B&selectedIndex=4&itb=0',
    'https://cn.bing.com/images/search?view=detailV2&ccid=W5pnXKJR&id=1B01F449CA42A16CECD689532EFF8776E496DE5A&thid=OIP.W5pnXKJRIAgC0gyfCVpAsQHaFj&mediaurl=https%3a%2f%2fso1.360tres.com%2ft01f4d77fe2ee087f36.jpg&exph=494&expw=658&q=麦+黛薇卡&simid=607993484189912000&FORM=IRPRST&ck=AA6D3420620FF4C620EF9ACDF0940C1B&selectedIndex=4&itb=0',
    'https://cn.bing.com/images/search?view=detailV2&ccid=W5pnXKJR&id=1B01F449CA42A16CECD689532EFF8776E496DE5A&thid=OIP.W5pnXKJRIAgC0gyfCVpAsQHaFj&mediaurl=https%3a%2f%2fso1.360tres.com%2ft01f4d77fe2ee087f36.jpg&exph=494&expw=658&q=麦+黛薇卡&simid=607993484189912000&FORM=IRPRST&ck=AA6D3420620FF4C620EF9ACDF0940C1B&selectedIndex=4&itb=0',
    'https://cn.bing.com/images/search?view=detailV2&ccid=W5pnXKJR&id=1B01F449CA42A16CECD689532EFF8776E496DE5A&thid=OIP.W5pnXKJRIAgC0gyfCVpAsQHaFj&mediaurl=https%3a%2f%2fso1.360tres.com%2ft01f4d77fe2ee087f36.jpg&exph=494&expw=658&q=麦+黛薇卡&simid=607993484189912000&FORM=IRPRST&ck=AA6D3420620FF4C620EF9ACDF0940C1B&selectedIndex=4&itb=0',
];

export default class ToolGuide extends React.Component<{}, State> {
    render() {
        return (
            <div className='guide-wrapper'>
                {guideGifs.map((gif, i) => <img key={i} className='guide-gif' src={gif} />)}
            </div>
        )
    }
}