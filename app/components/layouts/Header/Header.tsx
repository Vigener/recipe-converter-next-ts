"use client";
import Link from "next/link";
import BenchTimeLogo from "../../../images/BenchTimeLogo.png";
import { useState } from "react";

type LinkProps = {
  label: string;
  href: string;
  description: string;
};

type HeaderProps = {
  links: LinkProps[];
  loginFlag: boolean;
};

function HeaderLogo() {
  return (
    <div className="flex items-center">
      <img
        src={BenchTimeLogo.src}
        alt="Bench Time Logo"
        className="w-[50px] h-[50px] rounded-full object-cover"
      />
    </div>
  );
}

// function Header() {
//   return (
//     <header className="bg-[#123456] text-white flex justify-between items-center p-4">
//       <HeaderLogo />
//       <div className="text-2xl">Bench Time</div>
//       <button className="text-3xl">&#9776;</button>
//     </header>
//   );
// }

export function Header(props: HeaderProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(true);
  };

  const onClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-10 shadow-md">
        <nav className="flex w-full justify-between bg-white lg:h-16 lg:px-6">
          <div className="flex items-center w-full">
            <div className="block w-full">
              {/* flexで横方向に配置 */}
              <ul className="lg:flex select-none">
                <li>
                  {/* PCの場合のみ表示する要素 */}
                  <Link
                    href="/"
                    className="
                hidden lg:flex items-center h-full px-2 transition duration-150 ease-in-out
                text-gray-800
                hover:text-gray-400
                focus:text-gray-400
              "
                  >
                    <HeaderLogo />
                  </Link>

                  {/* タブレット・スマホの場合のみ表示する要素（1リスト目にヘッダ情報を並べる） */}
                  <div className="lg:hidden flex items-center h-14 w-full justify-between">
                    {/* ハンバーガーボタン */}
                    <div className="flex px-3">
                      {!open && (
                        <svg
                          onClick={onClickOpen}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          role="img"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                          ></path>
                        </svg>
                      )}
                      {open && (
                        <svg
                          onClick={onClickClose}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    {/* ロゴ */}
                    <div className="flex px-3 py-2">
                      <Link href="/">
                        <HeaderLogo />
                      </Link>
                    </div>

                    {/* ログアウトボタン */}
                    <div className="flex mr-2 w-12">
                      {props.loginFlag && (
                        <form method="post" action="/logout">
                          {/* <Form method="post" action="/logout"> */}
                          <button
                            type="submit"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            className="inline-block px-0 py-1 text-center bg-white text-gray-500 font-medium text-xs leading-tight uppercase focus:outline-one focus:ring-0 transition ease-in-out"
                          >
                            <img
                              src="/img/header/icon_logout.png"
                              className="h-10 inline-block"
                              alt="ログアウトの画像"
                            />
                            <br />
                          </button>
                        </form>
                        // </Form>
                      )}
                    </div>
                  </div>
                </li>
                {/* メニュー内容は各画面サイズで共有する。 */}
                {open && <MenuList className="lg:hidden" links={props.links} />}
                <MenuList className="hidden lg:list-item" links={props.links} />
              </ul>
            </div>
          </div>

          {/* PCの場合のみ、右端に表示する要素 */}
          {/* <div className="items-center shrink-0 hidden lg:flex">
            {!props.loginFlag && (
              <Link href="/authlogin">
                <button className="self-center px-8 py-3 rounded">
                  ログイン
                </button>
              </Link>
            )}
            {!props.loginFlag && (
              <Link href="/accountnew">
                <button className="self-center px-8 py-3 font-semibold rounded text-gray-800 bg-yellow-400">
                  新規登録
                </button>
              </Link>
            )}
            {props.loginFlag && (
              <form method="post" action="/logout">
                <button className="self-center px-4 py-3 rounded text-white bg-red-400">
                  ログアウト
                </button>
              </form>
            )}
          </div> */}
        </nav>
      </header>
    </>
  );
}

type MenuListProps = {
  links: LinkProps[];
  className?: string;
};

function MenuList({ links, className }: MenuListProps): React.ReactElement {
  return (
    <>
      <li className={className}>
        <Link
          href="/"
          className="
          flex items-center px-4 transition duration-150 ease-in-out
            text-gray-800
            hover:text-gray-400 hover:underline
            focus:text-gray-400 focus:underline
            h-12 lg:h-full
            w-full lg:w-auto
            bg-gray-100 lg:bg-transparent
            border-2 focus:border-gray-800 lg:border-0
          "
        >
          HOME
        </Link>
      </li>
      {links.map((link) => (
        <li className={className}>
          <Link
            href={link.href}
            className="
            flex items-center px-4 transition duration-150 ease-in-out
            text-gray-800
            hover:text-gray-400 hover:underline
            focus:text-gray-400 focus:underline
            h-12 lg:h-full
            w-full lg:w-auto
            bg-gray-100 lg:bg-transparent
            border-2 focus:border-gray-800 lg:border-0
          "
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}
