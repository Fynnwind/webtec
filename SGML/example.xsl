<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
    <head>
      <title>Address Book</title>
    </head>
    <body>
      <h1>Address Book</h1>
      <xsl:apply-templates select="addressbook/address"/>
    </body>
  </html>
</xsl:template>

<xsl:template match="address">
  <div>
    <h2>Contact Information</h2>
    <p><strong>Name:</strong> <xsl:value-of select="name"/></p>
    <p><strong>Last Name:</strong> <xsl:value-of select="lastname"/></p>
    
    <h3>Phone Numbers:</h3>
    <ul>
      <xsl:for-each select="phone">
        <li><xsl:value-of select="."/> (<xsl:value-of select="@type"/>)</li>
      </xsl:for-each>
    </ul>
    
    <h3>Work Location:</h3>
    <p><strong>Street:</strong> <xsl:value-of select="location[@type='work']/street"/></p>
    <p><strong>POC:</strong> <xsl:value-of select="location[@type='work']/poc"/></p>
    <p><strong>City:</strong> <xsl:value-of select="location[@type='work']/city"/></p>
  </div>
</xsl:template>

</xsl:stylesheet>

