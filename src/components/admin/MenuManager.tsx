import { useState } from 'react';
import { Menu, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  name: string;
  translationKey: string;
  url: string;
  isEnabled: boolean;
  isLocked?: boolean; // Some menus might be locked (e.g., Home)
}

export function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Home',
      translationKey: 'header.menu.home',
      url: '/',
      isEnabled: true,
      isLocked: true // Home should always be enabled
    },
    {
      id: '2',
      name: 'About',
      translationKey: 'header.menu.about',
      url: '/about',
      isEnabled: true
    },
    {
      id: '3',
      name: 'Ministries',
      translationKey: 'header.menu.ministries',
      url: '/ministries',
      isEnabled: true
    },
    {
      id: '4',
      name: 'Gallery',
      translationKey: 'header.menu.gallery',
      url: '/gallery',
      isEnabled: true
    },
    {
      id: '5',
      name: 'News',
      translationKey: 'header.menu.news',
      url: '/news',
      isEnabled: true
    },
    {
      id: '6',
      name: 'Awards',
      translationKey: 'header.menu.awards',
      url: '/awards',
      isEnabled: true
    },
    {
      id: '7',
      name: 'Resources',
      translationKey: 'header.menu.resources',
      url: '/resources',
      isEnabled: true
    },
    {
      id: '8',
      name: 'Directors',
      translationKey: 'header.menu.directors',
      url: '/directors',
      isEnabled: true
    },
    {
      id: '9',
      name: 'Stories',
      translationKey: 'header.menu.stories',
      url: '/storiesnew',
      isEnabled: true
    },
    {
      id: '10',
      name: 'Contact',
      translationKey: 'header.menu.contact',
      url: '/contact',
      isEnabled: true
    },
    {
      id: '11',
      name: 'Donate',
      translationKey: 'header.menu.donate',
      url: '/donate',
      isEnabled: true,
      isLocked: true // Donate should always be enabled
    }
  ]);

  const handleToggle = (id: string) => {
    const menuItem = menuItems.find(m => m.id === id);
    if (!menuItem) return;

    if (menuItem.isLocked) {
      toast.error(`${menuItem.name} menu cannot be disabled as it is a core navigation item.`);
      return;
    }

    const newStatus = !menuItem.isEnabled;
    setMenuItems(menuItems.map(m => 
      m.id === id ? { ...m, isEnabled: newStatus } : m
    ));

    toast.success(
      newStatus 
        ? `${menuItem.name} menu is now enabled and will be visible on the website` 
        : `${menuItem.name} menu is now disabled and will be hidden from the website`
    );
  };

  const enabledCount = menuItems.filter(m => m.isEnabled).length;
  const totalCount = menuItems.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-white mb-2">Menu Management</h2>
        <p className="text-gray-400">Control which menu items are visible on the main website</p>
      </div>

      {/* Preview Notice */}
      <Alert className="bg-[#1a1a1a] border-[#FDB813]">
        <AlertCircle className="h-4 w-4 !text-[#FDB813]" />
        <AlertDescription className="text-gray-300">
          <strong className="text-[#FDB813]">Preview Mode:</strong> Changes made here use fallback data and will not persist after refresh.
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="bg-black rounded-lg border border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="text-[#FDB813]" size={24} />
            <div>
              <p className="text-sm text-gray-400">Menu Status</p>
              <p className="text-white">
                <span className="text-[#FDB813] font-bold">{enabledCount}</span> of {totalCount} menus enabled
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Disabled Menus</p>
            <p className="text-white font-bold">{totalCount - enabledCount}</p>
          </div>
        </div>
      </div>

      {/* Menu Items List */}
      <div className="bg-black rounded-lg border border-gray-700 divide-y divide-gray-700">
        {menuItems.map((item, index) => (
          <div key={item.id} className="p-4 hover:bg-[#1a1a1a] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-gray-500 text-sm w-8">#{index + 1}</span>
                  <h3 className="text-white">{item.name}</h3>
                  {item.isLocked && (
                    <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded">
                      Core Menu
                    </span>
                  )}
                  {item.isEnabled ? (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded">
                      <Eye size={12} />
                      Visible
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">
                      <EyeOff size={12} />
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 ml-11">
                  <span>URL: <code className="text-[#FDB813]">{item.url}</code></span>
                  <span className="text-xs text-gray-500">i18n: {item.translationKey}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Label 
                  htmlFor={`menu-${item.id}`} 
                  className={`text-sm cursor-pointer ${
                    item.isLocked ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {item.isEnabled ? 'Enabled' : 'Disabled'}
                </Label>
                <Switch
                  id={`menu-${item.id}`}
                  checked={item.isEnabled}
                  onCheckedChange={() => handleToggle(item.id)}
                  disabled={item.isLocked}
                  className="data-[state=checked]:bg-[#FDB813]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
        <h4 className="text-white mb-2 flex items-center gap-2">
          <AlertCircle size={16} className="!text-[#FDB813]" />
          Menu Management Information
        </h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• <strong>Enabled Menus:</strong> Will be visible in the website header and mobile menu</li>
          <li>• <strong>Disabled Menus:</strong> Will be hidden from the website but pages remain accessible via direct URL</li>
          <li>• <strong>Core Menus:</strong> Home and Donate cannot be disabled as they are essential navigation items</li>
          <li>• <strong>Translation Support:</strong> Menu labels use i18next translation keys for multi-language support</li>
          <li>• <strong>URL Structure:</strong> Menu URLs are linked to their respective page routes</li>
        </ul>
      </div>
    </div>
  );
}
