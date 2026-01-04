'use client';

import { useState } from 'react';

interface SubnetResults {
  type: string;
  ipAddress?: string;
  subnetMask?: string;
  cidr?: number;
  networkAddress?: string;
  broadcastAddress?: string;
  firstHost?: string;
  lastHost?: string;
  totalHosts?: number;
  usableHosts?: number;
  wildcardMask?: string;
  networkClass?: string;
  defaultMask?: string;
  isPrivate?: boolean;
  binaryInfo?: {
    ipBinary: string;
    maskBinary: string;
    networkBinary: string;
  };
  originalNetwork?: string;
  requiredSubnets?: number;
  subnetBits?: number;
  newCidr?: number;
  hostsPerSubnet?: number;
  subnets?: Array<{
    subnet: number;
    network: string;
    firstHost: string;
    lastHost: string;
    broadcast: string;
    cidr: number;
    usableHosts: number;
  }>;
}

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState('');
  const [subnetMask, setSubnetMask] = useState('');
  const [cidr, setCidr] = useState('');
  const [calculationType, setCalculationType] = useState('basic');
  const [requiredHosts, setRequiredHosts] = useState('');
  const [requiredSubnets, setRequiredSubnets] = useState('');
  const [results, setResults] = useState<SubnetResults | null>(null);

  const cidrToMask = (cidr: number): string => {
    const mask = (0xffffffff << (32 - cidr)) >>> 0;
    return [
      (mask >>> 24) & 0xff,
      (mask >>> 16) & 0xff,
      (mask >>> 8) & 0xff,
      mask & 0xff
    ].join('.');
  };

  const maskToCidr = (mask: string): number => {
    const parts = mask.split('.').map(Number);
    const binaryMask = parts.map(part => part.toString(2).padStart(8, '0')).join('');
    return binaryMask.indexOf('0') === -1 ? 32 : binaryMask.indexOf('0');
  };

  const ipToNumber = (ip: string): number => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
  };

  const numberToIp = (num: number): string => {
    return [
      (num >>> 24) & 0xff,
      (num >>> 16) & 0xff,
      (num >>> 8) & 0xff,
      num & 0xff
    ].join('.');
  };

  const calculateSubnet = () => {
    if (!ipAddress) return;

    let maskValue: string;
    let cidrValue: number;

    if (calculationType === 'basic') {
      if (cidr) {
        cidrValue = parseInt(cidr);
        maskValue = cidrToMask(cidrValue);
      } else if (subnetMask) {
        maskValue = subnetMask;
        cidrValue = maskToCidr(subnetMask);
      } else {
        return;
      }
    } else {
      // VLSM calculation
      const hosts = parseInt(requiredHosts);
      if (!hosts) return;
      
      // Calculate required bits for hosts (including network and broadcast)
      const hostBits = Math.ceil(Math.log2(hosts + 2));
      cidrValue = 32 - hostBits;
      maskValue = cidrToMask(cidrValue);
    }

    const ipNum = ipToNumber(ipAddress);
    const maskNum = ipToNumber(maskValue);
    
    const networkNum = ipNum & maskNum;
    const broadcastNum = networkNum | (~maskNum >>> 0);
    const firstHostNum = networkNum + 1;
    const lastHostNum = broadcastNum - 1;
    
    const totalHosts = Math.pow(2, 32 - cidrValue);
    const usableHosts = totalHosts - 2; // Exclude network and broadcast
    
    const wildcardMask = numberToIp(~maskNum >>> 0);
    
    // Determine network class
    const firstOctet = parseInt(ipAddress.split('.')[0]);
    let networkClass: string;
    let defaultMask: string;
    
    if (firstOctet >= 1 && firstOctet <= 126) {
      networkClass = 'A';
      defaultMask = '255.0.0.0';
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      networkClass = 'B';
      defaultMask = '255.255.0.0';
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      networkClass = 'C';
      defaultMask = '255.255.255.0';
    } else {
      networkClass = 'Unknown';
      defaultMask = 'N/A';
    }

    const isPrivate = 
      (firstOctet === 10) ||
      (firstOctet === 172 && parseInt(ipAddress.split('.')[1]) >= 16 && parseInt(ipAddress.split('.')[1]) <= 31) ||
      (firstOctet === 192 && parseInt(ipAddress.split('.')[1]) === 168);

    setResults({
      type: calculationType === 'basic' ? 'Subnet Information' : 'VLSM Subnet Information',
      ipAddress: ipAddress,
      subnetMask: maskValue,
      cidr: cidrValue,
      networkAddress: numberToIp(networkNum),
      broadcastAddress: numberToIp(broadcastNum),
      firstHost: numberToIp(firstHostNum),
      lastHost: numberToIp(lastHostNum),
      totalHosts: totalHosts,
      usableHosts: usableHosts,
      wildcardMask: wildcardMask,
      networkClass: networkClass,
      defaultMask: defaultMask,
      isPrivate: isPrivate,
      binaryInfo: {
        ipBinary: ipAddress.split('.').map(n => parseInt(n).toString(2).padStart(8, '0')).join('.'),
        maskBinary: maskValue.split('.').map(n => parseInt(n).toString(2).padStart(8, '0')).join('.'),
        networkBinary: numberToIp(networkNum).split('.').map(n => parseInt(n).toString(2).padStart(8, '0')).join('.')
      }
    });
  };

  const generateSubnets = () => {
    if (!ipAddress || !requiredSubnets) return;

    const subnets = parseInt(requiredSubnets);
    const subnetBits = Math.ceil(Math.log2(subnets));
    const hostBits = 32 - parseInt(cidr || '24') - subnetBits;
    
    if (hostBits < 2) {
      alert('Not enough host bits for the required number of subnets');
      return;
    }

    const newCidr = 32 - hostBits;
    const subnetSize = Math.pow(2, hostBits);
    const baseNetwork = ipToNumber(ipAddress) & ipToNumber(cidrToMask(parseInt(cidr || '24')));

    const subnetList = [];
    for (let i = 0; i < subnets; i++) {
      const subnetNetwork = baseNetwork + (i * subnetSize);
      const subnetBroadcast = subnetNetwork + subnetSize - 1;
      
      subnetList.push({
        subnet: i + 1,
        network: numberToIp(subnetNetwork),
        firstHost: numberToIp(subnetNetwork + 1),
        lastHost: numberToIp(subnetBroadcast - 1),
        broadcast: numberToIp(subnetBroadcast),
        cidr: newCidr,
        usableHosts: subnetSize - 2
      });
    }

    setResults({
      type: 'Subnet Division',
      originalNetwork: ipAddress + '/' + (cidr || '24'),
      requiredSubnets: subnets,
      subnetBits: subnetBits,
      newCidr: newCidr,
      hostsPerSubnet: subnetSize - 2,
      subnets: subnetList
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🌐</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subnet Calculator</h1>
          <p className="text-gray-600">Calculate network subnets, IP ranges, and subnet divisions</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCalculationType('basic')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'basic'
                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Basic Subnet
          </button>
          <button
            onClick={() => setCalculationType('vlsm')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'vlsm'
                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            VLSM
          </button>
          <button
            onClick={() => setCalculationType('division')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'division'
                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Subnet Division
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">IP Address</label>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="192.168.1.1"
          />
        </div>

        {calculationType === 'basic' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subnet Mask</label>
              <input
                type="text"
                value={subnetMask}
                onChange={(e) => setSubnetMask(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="255.255.255.0"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">CIDR Notation (alternative)</label>
              <input
                type="number"
                min="1"
                max="32"
                value={cidr}
                onChange={(e) => setCidr(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="24"
              />
            </div>
          </>
        )}

        {calculationType === 'vlsm' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Hosts</label>
            <input
              type="number"
              value={requiredHosts}
              onChange={(e) => setRequiredHosts(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="100"
            />
          </div>
        )}

        {calculationType === 'division' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original CIDR</label>
              <input
                type="number"
                min="1"
                max="30"
                value={cidr}
                onChange={(e) => setCidr(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Subnets</label>
              <input
                type="number"
                value={requiredSubnets}
                onChange={(e) => setRequiredSubnets(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="4"
              />
            </div>
          </>
        )}
      </div>

      <button
        onClick={calculationType === 'division' ? generateSubnets : calculateSubnet}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
            <h3 className="text-lg font-semibold text-cyan-900 mb-4">{results.type}</h3>

            {results.type === 'Subnet Division' ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-900">{results.requiredSubnets}</div>
                    <div className="text-sm text-cyan-700">Subnets Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-900">{results.hostsPerSubnet}</div>
                    <div className="text-sm text-cyan-700">Hosts Per Subnet</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-cyan-200">
                        <th className="text-left py-2">Subnet</th>
                        <th className="text-left py-2">Network</th>
                        <th className="text-left py-2">First Host</th>
                        <th className="text-left py-2">Last Host</th>
                        <th className="text-left py-2">Broadcast</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.subnets?.map((subnet, index) => (
                        <tr key={index} className="border-b border-cyan-100">
                          <td className="py-2">{subnet.subnet}</td>
                          <td className="py-2">{subnet.network}/{subnet.cidr}</td>
                          <td className="py-2">{subnet.firstHost}</td>
                          <td className="py-2">{subnet.lastHost}</td>
                          <td className="py-2">{subnet.broadcast}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-900">{results.networkAddress}</div>
                    <div className="text-sm text-cyan-700">Network Address</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-900">{results.broadcastAddress}</div>
                    <div className="text-sm text-cyan-700">Broadcast Address</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-900">{results.usableHosts}</div>
                    <div className="text-sm text-cyan-700">Usable Hosts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-900">{results.firstHost}</div>
                    <div className="text-sm text-cyan-700">First Host</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-900">{results.lastHost}</div>
                    <div className="text-sm text-cyan-700">Last Host</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-900">/{results.cidr}</div>
                    <div className="text-sm text-cyan-700">CIDR Notation</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-cyan-900 mb-3">Network Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Subnet Mask:</span> {results.subnetMask}
                    </div>
                    <div>
                      <span className="font-medium">Wildcard Mask:</span> {results.wildcardMask}
                    </div>
                    <div>
                      <span className="font-medium">Network Class:</span> {results.networkClass}
                    </div>
                    <div>
                      <span className="font-medium">IP Type:</span> {results.isPrivate ? 'Private' : 'Public'}
                    </div>
                  </div>
                </div>

                {results.binaryInfo && (
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-cyan-900 mb-3">Binary Representation</h4>
                    <div className="space-y-2 text-sm font-mono">
                      <div>
                        <span className="font-medium">IP Address:</span> {results.binaryInfo.ipBinary}
                      </div>
                      <div>
                        <span className="font-medium">Subnet Mask:</span> {results.binaryInfo.maskBinary}
                      </div>
                      <div>
                        <span className="font-medium">Network:</span> {results.binaryInfo.networkBinary}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}