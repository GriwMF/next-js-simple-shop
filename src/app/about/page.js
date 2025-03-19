import Switch from "@mui/material/Switch";
import Link from '@mui/material/Link';
import * as NextLink from 'next/link';

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function About() {
 return (
    <div class="flex items-center justify-center h-screen">
      <div>
        <div>
          <span>With default Theme:</span>
        </div>
        <Switch {...label} defaultChecked />
        <Switch {...label} />
        <Switch {...label} disabled defaultChecked />
        <div>
          dsflkfdsl
        </div>
        <Link component={NextLink} href="/">To Home</Link>
      </div>
    </div>
  );
}
